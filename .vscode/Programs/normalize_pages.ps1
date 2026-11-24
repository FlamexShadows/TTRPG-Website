$ErrorActionPreference = 'Stop'

function Get-FileText {
    param([string]$Path)
    return [System.IO.File]::ReadAllText($Path)
}

function Set-FileText {
    param([string]$Path, [string]$Content)
    $enc = New-Object System.Text.UTF8Encoding -ArgumentList $false
    [System.IO.File]::WriteAllText($Path, $Content, $enc)
}

function Extract-DisplayName {
    param([string]$Html, [string]$Fallback)
    $m = [Regex]::Match($Html, '<h[23][^>]*>([^<]+)</h[23]>', 'IgnoreCase')
    if ($m.Success) { return $m.Groups[1].Value.Trim() }
    $m = [Regex]::Match($Html, 'Name:\s*([^<\n\r]+)', 'IgnoreCase')
    if ($m.Success) { return $m.Groups[1].Value.Trim() }
    return $Fallback
}

function Ensure-SingleHead {
    param([string]$Html)
    $Html = [Regex]::Replace($Html, '<head>\s*<head>', '<head>', 'IgnoreCase')
    $Html = [Regex]::Replace($Html, '</head>\s*</head>', '</head>', 'IgnoreCase')
    return $Html
}

function Upsert-InHead {
    param([string]$Html, [string]$Insert)
    if ([Regex]::IsMatch($Html, '</head>', 'IgnoreCase')) {
        return [Regex]::Replace($Html, '</head>', "$Insert`n</head>", 1, 'IgnoreCase')
    }
    if ([Regex]::IsMatch($Html, '<html[^>]*>', 'IgnoreCase')) {
        return [Regex]::Replace($Html, '(<html[^>]*>)', "$1`n<head>`n$Insert`n</head>", 1, 'IgnoreCase')
    }
    return "<head>`n$Insert`n</head>`n" + $Html
}

function Normalize-Title {
    param([string]$Html, [string]$DisplayName)
    $Desired = "<title>Sparks | $DisplayName</title>"
    if ([Regex]::IsMatch($Html, '<title>.*?</title>', 'IgnoreCase, Singleline')) {
        return [Regex]::Replace($Html, '<title>.*?</title>', [Regex]::Escape($Desired).Replace('\\', '\\'), 1, 'IgnoreCase, Singleline')
    }
    return Upsert-InHead -Html $Html -Insert $Desired
}

function Ensure-Assets {
    param([string]$Html)
    $inserts = @()
    if (-not [Regex]::IsMatch($Html, 'A-Nav-bar\.css', 'IgnoreCase')) {
        $inserts += '<link rel="stylesheet" type="text/css" href="A-Nav-bar.css"/>'
    }
    if (-not [Regex]::IsMatch($Html, 'ajax\.googleapis\.com/ajax/libs/jquery/', 'IgnoreCase')) {
        $inserts += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>'
    }
    if (-not [Regex]::IsMatch($Html, '\$\(function\(\)\)\s*\{\s*\$\("header"\)\.load\("A-Header\.html"', 'IgnoreCase')) {
        $inserts += @(
            '<script>',
            '$(function(){',
            '  $("header").load("A-Header.html");',
            '});',
            '</script>'
        ) -join "`n"
    }
    if ($inserts.Count -gt 0) {
        $Html = Upsert-InHead -Html $Html -Insert ($inserts -join "`n")
    }
    return $Html
}

function Normalize-Header {
    param([string]$Html)
    if ([Regex]::IsMatch($Html, '<header[\s\S]*?>[\s\S]*?</header>', 'IgnoreCase')) {
        $Html = [Regex]::Replace($Html, '<header[\s\S]*?>[\s\S]*?</header>', '<header>`n</header>', 1, 'IgnoreCase')
    } else {
        $Html = [Regex]::Replace($Html, '(<body[^>]*>)', "$1`n<header>`n</header>", 1, 'IgnoreCase')
    }
    $Html = [Regex]::Replace($Html, '<object[^>]*A-Header\.html[^>]*/?>', '', 'IgnoreCase')
    return $Html
}

function Ensure-MainContent {
    param([string]$Html)
    if (-not [Regex]::IsMatch($Html, '<div[^>]*class=\"[^\"]*main-content', 'IgnoreCase')) {
        $Html = [Regex]::Replace(
            $Html,
            '(<header>\s*</header>)([\s\S]*?</body>)',
            '$1`n<div class="main-content">$2',
            1,
            'IgnoreCase'
        )
        # Close the main-content before </body>
        $Html = [Regex]::Replace($Html, '</body>', '</div>`n</body>', 1, 'IgnoreCase')
    }
    return $Html
}

function Is-SpellOrManeuver {
    param([string]$Html)
    $patterns = @(
        'AP\s*Cost', 'Spell\s*Rank', 'Subtype', 'Concentration',
        'AP:\s*\d', 'Type:', 'Range:', 'Duration:'
    )
    foreach ($p in $patterns) { if ([Regex]::IsMatch($Html, $p, 'IgnoreCase')) { return $true } }
    return $false
}

function Process-File {
    param([string]$Path)
    $original = Get-FileText -Path $Path
    $html = $original
    if (-not (Is-SpellOrManeuver -Html $html)) { return $false }

    $display = Extract-DisplayName -Html $html -Fallback ([IO.Path]::GetFileNameWithoutExtension($Path))
    $html = Ensure-SingleHead -Html $html
    $html = Normalize-Title -Html $html -DisplayName $display
    $html = Ensure-Assets -Html $html
    $html = Normalize-Header -Html $html
    $html = Ensure-MainContent -Html $html
    $html = [Regex]::Replace($html, 'Sparks\|', 'Sparks |')

    if ($html -ne $original) {
        Set-FileText -Path $Path -Content $html
        Write-Output "Updated: $Path"
        return $true
    }
    return $false
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$targets = @(
    (Join-Path $root 'Webpages'),
    (Join-Path $root 'spells')
)

$changed = 0
$scanned = 0

foreach ($dir in $targets) {
    if (-not (Test-Path $dir)) { continue }
    Get-ChildItem -Path $dir -Recurse -Filter *.html | ForEach-Object {
        $scanned++
        try {
            if (Process-File -Path $_.FullName) { $changed++ }
        } catch {
            Write-Warning "Error processing $($_.FullName): $($_.Exception.Message)"
        }
    }
}

Write-Output "Scanned $scanned HTML files. Updated $changed."


