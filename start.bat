@echo off
title Lernportal (lokaler Server)
cd /d "%~dp0"
echo ================================================================
echo        LERNPORTAL - lokaler Server (fuer IServ und Notizen)
echo ================================================================
echo Starte Webserver auf http://localhost:8000 ...
echo Dieses Fenster offen lassen, solange du das Portal nutzt.
start "" /min cmd /c "ping -n 3 127.0.0.1 >nul & start http://localhost:8000"
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo Python Server konnte nicht gestartet werden. Starte stattdessen direkt index.html...
    echo (Ohne Server funktionieren IServ und Speichern von Notizen nicht.)
    start index.html
)
pause
