class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
    }
    criarAtendimentos() {
        const sql = 'create table if not exists atendimentos(id int not null auto_increment, cliente varchar(50) not null, pet varchar(20), serviço varchar(20) not null,data datetime not null,data_de_cricao datetime not null, status varchar(20) not null, observacoes text, primary key (id))'

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro);
            } else {
                console.log('Tabela Atendimentos criada com sucesso');
            }
        })
    }
}

module.exports = new Tabelas