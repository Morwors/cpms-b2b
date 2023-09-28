export interface ITableData {
    name?: string,
    label?: string
    value?: any[]
}

export interface ITableOptions {
    inputs: ITableOptionsInput[],
    checkboxs?: boolean;
    radiobuttons?: boolean;
}

export interface ITableOptionsInput{
        expandable?: boolean
        label?: string,
        keys?: string[],
        type?: string
        color?: string
        editable?: boolean
        editableText?: string
        clearEditable?: boolean
}