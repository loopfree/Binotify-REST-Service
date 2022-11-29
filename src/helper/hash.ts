/**
 * function mengubah sebuah angka
 * menjadi representasinya dalam char sesuai unicode
 */
function chr(ascii: number): string {
    return String.fromCharCode(ascii);
}

/**
 * function ini mengubah sebuah string ( dengan panjang 0 )
 * menjadi representasi unicodenya
 */
function ord(str: string): number {
    return str.charCodeAt(0);
}

function hashUsername(name: string): number {
    let hash: number = 0;
    for(let i = 0; i < name.length; ++i) {
        hash += ord(name[i]) + i;
    }

    return hash;
}

function hashPassword(password: string): string {
    let hash: string = "";
    for(let i = 0; i < password.length; ++i) {
        hash += chr(ord(password[i]) + i);
    }

    return hash;
}

export {
    hashUsername,
    hashPassword
}