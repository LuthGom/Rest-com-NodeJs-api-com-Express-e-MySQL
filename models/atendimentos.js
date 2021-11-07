const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    add(atendimento, res) {
        const data_de_criacao = new moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(data).isSameOrAfter(data_de_criacao)

        const clienteValido = atendimento.cliente.length >= 5
        
        const validacoes = [{
            nome: 'data',
            valido: dataValida,
            mensagem: 'Data deve ser maior ou igual a data atual'
        },
        {
            nome: 'cliente',
            valido: clienteValido,
            mensagem: 'Cliente deve ter pelo menos cinco caracteres'
        }
    ]
        const erros = validacoes.filter(campos=> !campos.valido)
        const existemErros = erros.length
        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = {... atendimento, data_de_criacao, data}
            const sql = 'insert into atendimentos set ?'
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados);
                }
            })
        }
    }
        }


module.exports = new Atendimento