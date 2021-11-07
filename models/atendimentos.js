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
                    res.status(201).json(atendimento);
                }
            })
        }
    }
    lista(res) {
        const sql = 'select * from atendimentos'
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `select * from atendimentos where id=${id}`
        conexao.query (sql, (erro, resultados)=> {
            const atendimento = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }
    altera(id, valores, res) {
        if(valores.data) {
            valores.data =  moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'
        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro) {
                res.status(400).json(erro)
            }else {
                res.status(200).json({...valores, id})
            }
        })
    }
    deleta( id, res) {
        const sql = 'delete from atendimentos where id = ?'
        conexao.query(sql, id, (erro, resultados) =>{
            if(erro) {
                res.status(400).json(erro)
            }else {
                res.status(200).json({id})
            }
        })
    }
        }


module.exports = new Atendimento