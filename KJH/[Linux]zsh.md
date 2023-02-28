zsh 설치

`sudo apt-get install zsh`

`which zsh`

`chsh -s $(which zsh)`

oh-my-zsh 설치 (깃이 먼저 설치가 되어있어야하는군)

sh -c "$(curl -fsSL [https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh))"

! curl이 없다면 → sudo apt-get install curl

명령어 에러보기 

*# 경로로 들어가서 git clone 받기*

cd ~/.oh-my-zsh/plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

*# echo 명령어 사용*

echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc

*# .zshrc의 plugins 부분에 추가해주기*

nano ~/.zshrc
plugins=(git zsh-syntax-highlighting)

자주쓰는 명령어 자동완성

*# 경로로 들어가서 git clone 받기*

cd ~/.oh-my-zsh/plugins 
git clone https://github.com/zsh-users/zsh-autosuggestions.git

*# echo 명령어 사용*

echo "source ${(q-)PWD}/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc

*# .zshrc의 plugins 부분에 추가해주기*

vi ~/.zshrc
plugins=(git ... zsh-autosuggestions)