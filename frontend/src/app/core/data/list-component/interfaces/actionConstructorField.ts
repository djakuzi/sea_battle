export enum EnumActionConstructorFieldName {
        Save = 'save',
        ListSave = 'listSave',
        Random = 'random',
        Reset = 'reset',
}

export interface IntrListActionConstructorField {
        name: EnumActionConstructorFieldName,
        icon: string,
        desc: string,
        children: string,
}