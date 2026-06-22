---
title: PowerShell
date: 2026-06-21
tags:
  - powershell
  - windows
  - command-line
  - scripting
  - automation
---

[[PowerShell]] is a command-line shell and scripting language designed for system administration. It uses a **cmdlet** (pronounced "command-let") architecture where commands follow a `Verb-Noun` naming convention.

## Version check

```powershell
Get-Host | Select-Object Version
```

## Update help content

Downloads and installs the latest help files for all installed modules.

```powershell
Update-Help -UICulture en-US
```

> [!warning] `Update-Help` may fail on some systems even when connectivity is available — this is a known issue with the help update infrastructure.

## Update PowerShell itself

```powershell
iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"
```

Downloads and runs the latest PowerShell MSI installer.

## Windows Update via PowerShell

Install the `PSWindowsUpdate` module to manage [[Windows]] updates from the console with live download progress:

```powershell
Install-Module PSWindowsUpdate
Get-WindowsUpdate
Install-WindowsUpdate
```
