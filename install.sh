#!/bin/bash

# Ensure execution permissions
chmod +x install.sh

# Install NodeJS
echo "Installing NodeJS"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts

# Install docker
echo "Installing docker"
sudo apt-get update && sudo apt-get install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo groupadd docker  # Create docker group if it doesn't exist
sudo usermod -aG docker $USER

# Clone website code
echo "Cloning website"
git clone https://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@github.com/tfilonych/healthy-plate.git
cd healthy-plate
git checkout aws_train

# Forward port 80 traffic to port 3009
echo "Forwarding 80 -> 3009"
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3009

# Pull docker-compose
echo "Pull docker-compose and run"
sudo docker pull tfilonych/healthy-plate:dev
sudo docker-compose up
