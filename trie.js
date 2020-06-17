
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
            // end of eord reached
            if(i === word.length) return node.endOfWord;
            // check char existence
            if(!node.chars.has(word[i])) return false;
            return helper(i + 1, node.chars.get(word[i]));
        }

        return helper(0, this.root);
    }

    remove(word){
        if(!word) return false; 
        let stack = [], current = this.root;
        for(let i = 0 ; i < word.length; i++){
            if(!current.chars.has(word[i])) return false;
            // save character to delete empty nodes later
            stack.push({current : current, char : word[i]});
            current = current.chars.get(word[i]);
        }
        // if last node is not true then it's not a complete word
        if(!current.endOfWord) return false;
        // mark last node as false
        current.endOfWord = false;
        // remove empty nodes with endofWord as false
        while(stack.length > 0 && current.chars.size === 0 && !current.endOfWord){
            const node = stack.pop();
            node.current.chars.delete(node.char);
            current = node.current;
        }
        return true;
    }

    removeRecursive(word){
        if(!word) return false;
        let isDeleted = false;
        // recursion helper function
        const helper = (i, node) => {
            // character not found
            if(!node) return false;
            // word end reached
            if(i === word.length) {
               if(node.endOfWord){
                   // mark endOfWord as false to delete the word
                   isDeleted = true;
                   node.endOfWord = false;
                   return node.chars.size === 0;
               } else {
                   return false;
               }
            }
            // return false if char not found in node
            if(!node.chars.has(word[i])) return false;
            const deleteChild = helper(i + 1, node.chars.get(word[i]));
            // character not found / child node is not empty/ child node does not have endOfWord as false
            if(!deleteChild) return false;
            // delete character from node
            node.chars.delete(word[i]);
            // delete child node only if it is empty or endOfWord is false
            return node.chars.size === 0 && !node.endOfWord;
        }

        helper(0, this.root);
        return isDeleted;
    }

    /*
    * Returns all words starting with given prefix
    */
    prefixSearchList(prefix){
        const result = [];
        let current = this.root;
        
        // traverse to the child node of last character
        for(let char of prefix){
            // return empty array if char does not exist
            if(!current.chars.has(char)) return result;
            current = current.chars.get(char);
        }

        // helper fn for recursion
        const helper = (node, prefixArr) => {
            if(node.endOfWord){
                result.push(prefixArr.slice());
            }
            for(let char of node.chars.keys()){
                prefixArr.push(char);
                helper(node.chars.get(char), prefixArr)
                prefixArr.pop();
            }
        }
        // invoke helper fn
        helper(current, prefix.split(''));
        // join all the chars
        return result.map(chars => chars.join(''));
    }

    /*
    * Returns list of words that exists in paragraph
    */
    searchWords(wordList, paragraph){
        // return words that are in the list
    }
}
