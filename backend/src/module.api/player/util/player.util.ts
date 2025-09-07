export function createNickname(typeCreate: 'login' | 'uuid', data: string): string {
    let nickname: string = '';

    switch(typeCreate) {
        case 'login':
            nickname = data;
            break;
        case 'uuid':
            nickname = 'user' + data;
            break;
        default: 
            nickname = 'user' + data;
    }

    return nickname;
}


const utilPlayer = {
    createNickname,
}

export default utilPlayer;