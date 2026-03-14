#!/bin/bash
# Install MySQL 8.0 on Ubuntu 24.04

set -e

apt-get update -qq

# Install the base protobuf library from noble (non-updates) to avoid 404
apt-get install -y libprotobuf-lite32t64=3.21.12-8.2build1 || true

# Install MySQL server
apt-get install -y --fix-missing mysql-server

echo "MySQL installed successfully: $(mysql --version)"
