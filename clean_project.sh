#!/bin/bash

# Remove yarn.lock, package-lock.json e node_modules
rm -rf yarn.lock package-lock.json node_modules

# Navega para o diretório ios
cd ios

# Remove Pods e Podfile.lock
rm -rf Pods
rm -rf Podfile.lock

# Remove DerivedData do Xcode
rm -rf ~/Library/Developer/Xcode/DerivedData

# Volta para o diretório raiz do projeto
cd ..

