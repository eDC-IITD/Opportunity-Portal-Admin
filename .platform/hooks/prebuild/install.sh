#!/bin/sh

if [ -f "/swapfile" ]; 
then
    echo "SWAP exists."
else 
    dd if=/dev/zero of=/swapfile bs=128M count=16
    chmod 600 /swapfile
    mkswap /swapfile
fi

if [[ $(swapon -s | wc -l) -gt 0 ]] ;  
then 
    echo "SWAP is on" 
else
    swapon /swapfile
    swapon -s
fi
