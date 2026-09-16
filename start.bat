@echo off
title Mathe-1 Lernportal
cd /d "%~dp0"
echo ================================================================
echo        MATHE-1 LERNASSISTENT & INTERAKTIVES PORTAL
echo ================================================================
echo Starte Webserver auf http://localhost:8000 ...
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo Python Server konnte nicht gestartet werden. Starte stattdessen direkt index.html...
    start index.html
)
pause
