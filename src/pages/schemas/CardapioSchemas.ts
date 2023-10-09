import * as yup from "yup"

import { Cardapio } from "../../model/Cardapio";

export const CardapioSchema = yup
  .object<Cardapio>({
    principal: yup.string().required("Este campo é obrigatório"),
    guarnicao: yup.string().required("Este campo é obrigatório"),
    salada: yup.string().required("Este campo é obrigatório"),
    sobremesa: yup.string().required("Este campo é obrigatório"),
    suco: yup.string().required("Este campo é obrigatório"),
    periodo: yup.string().required("Este campo é obrigatório"),
    vegetariano: yup.string().required("Este campo é obrigatório"),
    data: yup.date().required("Este campo é obrigatório"),
    
  })
  .required()