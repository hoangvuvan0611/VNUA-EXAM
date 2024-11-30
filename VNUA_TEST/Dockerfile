# Su dung multi-stage build:
# - Giup giam kich thuoc cua container cuoi cung
# - Giai doan build chua tat ca cac cong cu va du lieu tam, nhung khong dua vao container cuoi cung

# Base image for running java application with Amazon Corretto 21 / Dung Amazon Corretto 21 de build ung dung
FROM amazoncorretto:21-alpine AS build
# Metadata / Thong tin tac gia
LABEL authors="vuvanhoang"
# Set default working directory / Thiet lap thu muc lam viec mac dinh trong container
WORKDIR /app
# Copy Maven Wrapper and pom.xml for dependency resolution / Sao chep tep Maven wrapper va tep cau hinh `pom.xml` vao container
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# Pre-download dependencies / Tai truoc cac dependencies cua maven de toi uu thoi gian build cho nhung lan sau
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline -B
# Copy source code / Sao chep ma nguon cua ung dung
COPY src ./src
# Build the application / Build ung dung va file jar, bo qua test
RUN ./mvnw package -DskipTests -B
RUN mv target/*.jar app.jar  # Đổi tên file JAR để dễ sao chép

# Final stage with Amazon Corretto 21 runtime / Giai doan 2: dung Amazon Corretto 21 de chay ung dung
FROM amazoncorretto:21-alpine
# Working directory / Thiet lap thu muc mac dinh lam viec trong container
WORKDIR /app
# Copy the built JAR from the build stage / Sao chep file Jar da build tu giai doan 1 de chay, giup giam kich thuoc container
COPY --from=build /app/app.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
# Command to run the application
CMD ["java", "-jar", "app.jar"]