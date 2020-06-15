class Node {
        constructor(){
            this.chars = new Map();
            this.endOfWord = false;
        }
    }
    class Trie {
        constructor(){
            this.root = new Node();
        }

        insert(word){
            if(!word) return null;
            let current = this.root;

            for(let char of word){
                // if char does not exist, put an entry
                if(!current.chars.has(char)){
                    current.chars.set(char, new Node())
                }
                // get next node for next iteration
                current = current.chars.get(char);
            }
            // mark end of the word
            current.endOfWord = true;
            return current;
        }

        insertRecursive(word){
            if(!word) return null;

            const helper = (i, node) => {
                if(i === word.length) {
                    // mark end of the word
                    node.endOfWord = true;
                    return node;
                }
                 // if char does not exist, put an entry
                if(!node.chars.has(word[i])){
                    node.chars.set(word[i], new Node())
                }
                return helper(i + 1, node.chars.get(word[i]))
            }
            return helper(0, this.root);
        }

        search(word){
            if(!word) return false;
            let current = this.root;
            // visit each character and check it's existence
            for(let char of word){
                if(!current.chars.has(char)) return false;
                current = current.chars.get(char);
            }
            return current.endOfWord;
        }

        searchRecursive(word){
            const helper = (i, node) => {
                if(i === word.length) return node.endOfWord;
                if(!node.chars.has(word[i])) return false;
                return helper(i + 1, node.chars.get(word[i]));
            }

            return helper(0, this.root);
        }

        deleteWord(word){

        }

        deleteRecursive(){

        }

        prefixSearchList(){
            
        }

        prefixSearchCount(){
            
        }

        searchWords(wordList, paragraph){
            // return words that are in the list
        }
    }
