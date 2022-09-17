@echo off

set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"

echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
if exist "%USERPROFILE%\Desktop\" (
	echo sLinkFile = "%USERPROFILE%\Desktop\KU_Udlevering.lnk" >> %SCRIPT%
)
if exist "%USERPROFILE%\OneDrive - University of Copenhagen\Desktop\" (
	echo sLinkFile = "%USERPROFILE%\OneDrive - University of Copenhagen\Desktop\KUIT-Udlevering.lnk" >> %SCRIPT%
)
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%~dp0main.html" >> %SCRIPT%
echo oLink.IconLocation = "%~dp0icon.ico" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

cscript /nologo %SCRIPT%
del %SCRIPT%