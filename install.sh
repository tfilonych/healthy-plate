#!/bin/bash

# Enable logs
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# Install NodeJS
echo "Installing NodeJS"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Install docker
echo "installing docker"
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
sudo apt install docker-compose

# Clone website code
echo "Cloning website"
git clone https://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@github.com/tfilonych/healthy-plate.git
cd healthy-plate
git checkout docker-init

# Pull docker-compose
echo "Pull docker-compose and run"
sudo docker pull tfilonych/healthy-plate:dev
docker-compose up
