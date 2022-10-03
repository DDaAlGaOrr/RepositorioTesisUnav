export interface Tesis {
    id: string
    schoolName: string
    file: string
    description: string
}
export const DEFAULT_TESIS: Tesis = {
    id: '',
    schoolName: '',
    file: '',
    description: ''
}
export enum SchoolNames {
    systemsEngineering = 'Ingeniería en sistemas',
    nutrition = 'Nutrición',
    theology = 'Teología',
    GraphicDesign = 'Diseño Gráfico',
    Nursing = 'Enfermeria',
    Gastronomy = 'Gastronomía',
    Accounting = 'Contabilidad',
    masterDegree = 'Maestría',
    educationalSciences = 'ciencias de la educación'
}
