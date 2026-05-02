# Script to start Android emulator and run WebdriverIO tests
# Usage (Windows): powershell -ExecutionPolicy Bypass -File scripts/run-wdio-mobile.ps1

param(
    [string]$AvdName = "Prelude_Pixel_7",
    [int]$BootWaitSeconds = 15
)

$ErrorActionPreference = "Stop"

# Get ANDROID_HOME from environment or use default
$AndroidHome = $env:ANDROID_HOME
if (-not $AndroidHome) {
    $AndroidHome = "$env:USERPROFILE\AppData\Local\Android\Sdk"
}

$EmuExe = Join-Path $AndroidHome "emulator\emulator.exe"

if (-not (Test-Path $EmuExe)) {
    Write-Error "Emulator not found at: $EmuExe"
    exit 1
}

Write-Host "Starting Android emulator: $AvdName..." -ForegroundColor Green
$process = Start-Process -FilePath $EmuExe -ArgumentList "-avd", $AvdName, "-no-snapshot-save", "-no-boot-anim" -PassThru

Write-Host "Waiting ${BootWaitSeconds}s for emulator to boot..." -ForegroundColor Yellow
Start-Sleep -Seconds $BootWaitSeconds

Write-Host "Running WDIO tests..." -ForegroundColor Green
$env:JAVA_HOME = [Environment]::GetEnvironmentVariable('JAVA_HOME', 'User')
$env:ANDROID_HOME = $AndroidHome
$env:ANDROID_SDK_ROOT = $AndroidHome

try {
    npm run wdio:test
    $testResult = $LASTEXITCODE
}
catch {
    $testResult = 1
    Write-Host "Error running tests: $_" -ForegroundColor Red
}

Write-Host "Killing emulator..." -ForegroundColor Yellow
Stop-Process -Id $process.Id -ErrorAction SilentlyContinue

if ($testResult -ne 0) {
    exit $testResult
}
