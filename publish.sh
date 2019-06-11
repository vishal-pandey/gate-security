sudo rm -r dist/*
ng build --prod --base-href https://vishal-pandey.github.io/gate-security/
sudo cp -r dist/browser/* dist/
sudo rm -r dist/browser
sudo ngh