# 베이스 이미지 설정
FROM python:3.10

# 작업 디렉토리 생성 및 이동
WORKDIR /app

# 프로젝트 파일 복사
COPY . .

# pip 최신화 + 의존성 설치
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Gunicorn으로 Django 실행
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]