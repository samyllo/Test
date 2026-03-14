#!/bin/bash
# Generate an ed25519 SSH key at ~/.ssh/id_ed25519
# - Creates ~/.ssh if it does not exist
# - Never overwrites an existing key
# - Prints the public key at the end

set -e

KEY_PATH="$HOME/.ssh/id_ed25519"
PUB_PATH="${KEY_PATH}.pub"
SSH_DIR="$HOME/.ssh"

# Create ~/.ssh with correct permissions if missing
if [ ! -d "$SSH_DIR" ]; then
    mkdir -p "$SSH_DIR"
    chmod 700 "$SSH_DIR"
    echo "Created $SSH_DIR"
fi

# Refuse to overwrite an existing key
if [ -f "$KEY_PATH" ]; then
    echo "Key $KEY_PATH already exists. Not overwriting."
    echo
    echo "=== Public key (~/.ssh/id_ed25519.pub) ==="
    cat "$PUB_PATH"
    exit 0
fi

# Generate the key (no passphrase)
ssh-keygen -t ed25519 -f "$KEY_PATH" -N "" -C "${USER}@$(hostname)"

echo
echo "=== Public key (~/.ssh/id_ed25519.pub) ==="
cat "$PUB_PATH"
