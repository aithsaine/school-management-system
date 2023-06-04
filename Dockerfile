# Use an official PHP runtime as the base image
FROM php:7.4-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer.lock and composer.json to the working directory
COPY composer.lock composer.json ./

# Install application dependencies
RUN composer install --no-scripts --no-autoloader

# Copy the entire project to the working directory
COPY . .

# Generate key for Laravel application
RUN php artisan key:generate

# Run migrations and seeders if needed
RUN php artisan migrate --seed

# Set permissions for Laravel storage and cache directories
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Expose port 9000 for the application
EXPOSE 9000

# Set the command to run the application
CMD ["php-fpm"]
