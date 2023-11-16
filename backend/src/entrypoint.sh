#!/bin/bash

set -e

source /venv/bin/activate

if [$l == 'gunicorn']; then
    exec gunicorn agridatahub.wsgi:application -b 0.0.0.0:8000
else
    exec python manage.py runserver 0.0.0.0:8000