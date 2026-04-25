FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]