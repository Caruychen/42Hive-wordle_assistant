printf "export default " > clean/targetWords.js
cat raw/main.4d41d2be.js | sed -n -e 's/^.*var Ma=\[/\[/p' | sed -n -e 's/\].*$/\]/p' >> clean/targetWords.js

printf "export default " > clean/allowedWords.js
cat raw/main.4d41d2be.js | sed -n -e 's/^.*,Oa=\[/\[/p' | sed -n -e 's/\].*$/\]/p' >> clean/allowedWords.js
