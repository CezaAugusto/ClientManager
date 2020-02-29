<template>
  <div class="container mt-5">
    <!-- Options-->
    <div>
      <b-modal
        no-stacking
        id="modal-options"
        header-bg-variant="dark"
        header-close
        header-text-variant="light"
        size="sm"
        centered
        hide-footer
        title="Opções"
      >
        <div class="mt-2 d-flex justify-content-center">
          <b-btn variant="success" v-b-modal.modal-info>Visualizar</b-btn>
          <b-btn
            variant="warning"
            v-b-modal.modal-edit
            class="ml-2"
            @click="show = true, msg=false"
          >Editar</b-btn>
          <b-btn variant="danger" v-b-modal.modal-confirm class="ml-2" @click="show = true">Deletar</b-btn>
        </div>
        <hr class="mx-2" />
        <div class="d-flex justify-content-center">
          <b-btn variant="info" class="mr-2" @click="Contacts()">Contatos</b-btn>
          <b-btn variant="info" class="ml-2" @click="Addresses()">Endereços</b-btn>
        </div>
      </b-modal>
    </div>

    <!-- Show infos user -->
    <div>
      <b-modal
        no-stacking
        header-close
        id="modal-info"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        centered
        title="Informações do Cliente"
      >
        <label>
          <img
            alt="ClientManager logo"
            class="mr-2"
            src="../assets/user.png"
            width="30px"
            height="30px"
          />
          {{select.name}}
        </label>
        <hr />
        <label>
          <img
            alt="ClientManager logo"
            class="mr-2"
            src="../assets/cpf.png"
            width="30px"
            height="30px"
          />
          {{select.cpf}}
        </label>
        <hr />
        <label type="date">
          <img
            alt="ClientManager logo"
            class="mr-2"
            src="../assets/birth.png"
            width="30px"
            height="30px"
          />
          {{select.birth}}
        </label>
        <hr />
        <b-btn
          variant="info"
          class="ml-2 float-right"
          @click="Addresses()"
          v-b-modal.modal-center
        >Endereços</b-btn>
        <b-btn
          variant="info"
          class="mr-2 float-right"
          @click="Contacts()"
          v-b-modal.modal-center
        >Contatos</b-btn>
      </b-modal>
    </div>
    <!-- Edit user -->
    <div>
      <b-modal
        v-if="show"
        id="modal-edit"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        header-close
        centered
        title="Editar Informações do Cliente"
      >
        <b-alert show dismissible @dismissed="msg=false" variant="danger" v-if="msg">{{error}}</b-alert>
        <label>Name *</label>
        <br />
        <input type="text" class="mb-2 pl-3 form-control" maxlength="50" v-model="name" />
        <hr />
        <label>
          CPF
          <small>(não editável)</small>
        </label>
        <br />
        <label type="text" class="mb-2 pl-3 form-control" name="username">{{select.cpf}}</label>
        <hr />
        <label>Data de nascimento *</label>
        <br />
        <input type="date" class="mb-2 pl-3 form-control" v-model="birth" />
        <hr />
        <b-btn variant class="float-right ml-3" @click="show=false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Edit()">Salvar</b-btn>
      </b-modal>
    </div>
    <!-- Confirm delete -->
    <div>
      <b-modal
        v-if="show"
        no-stacking
        header-close
        id="modal-confirm"
        title="Confirmar Ação?"
        size="md"
        hide-footer
        header-bg-variant="dark"
        header-text-variant="light"
      >
        <label>
          Tem certeza que quer excluir o cliente
          <strong>{{name}}</strong>?
        </label>
        <br />
        <hr />
        <b-btn variant="danger" class="float-right" @click="show = false">Cancelar</b-btn>
        <b-btn variant="success" class="float-right mr-3" @click="Delete()">Confirmar</b-btn>
      </b-modal>
    </div>

    <!-- Add user -->
    <div>
      <b-modal
        no-stacking
        v-if="show"
        id="modal-add"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        header-close
        centered
        title="Adicionar Cliente"
      >
        <b-alert show dismissible @dismissed="msg=false" variant="danger" v-if="msg">{{error}}</b-alert>
        <label>Name *</label>
        <br />
        <input
          type="text"
          class="mb-3 pl-3 form-control"
          placeholder="Nome"
          maxlength="50"
          v-model="addname"
        />
        <hr />
        <label>
          CPF *
          <small><strong>(somente números)</strong></small>
        </label>
        <input class="mb-3 pl-3 form-control" maxlength="11" placeholder="CPF" v-model="addcpf" />
        <hr />
        <label>Data de nascimento *</label>
        <br />
        <input type="date" class="mb-2 pl-3 form-control" name="date" v-model="addbirth" />
        <hr />
        <b-btn variant class="float-right ml-3" @click="show = false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Add()">Salvar</b-btn>
      </b-modal>
    </div>
    <!-- ------------------------------------------------------------------------------- -->

    <div class="card border-mutted">
      <div class="card-header bg-secondary text-white">
        <label>
          <h4 class="ml-1 mt-1 row mb-0">Lista de Clientes</h4>
        </label>
        <b-btn
          variant="success"
          v-b-modal.modal-add
          class="text-white float-right"
          @click="show = true"
        >Adicionar Cliente</b-btn>
      </div>
      <table class="table table-hover table-responsive-md">
        <thead>
          <tr>
            <th scope="col">
              <center>#</center>
            </th>
            <th scope="col">
              <center>NOME</center>
            </th>
            <th scope="col">
              <center>CPF</center>
            </th>
            <th scope="col">
              <center>DATA DE NASCIMENTO</center>
            </th>
            <th scope="col">
              <center>AÇÕES</center>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <td>
              <center>{{index}}</center>
            </td>
            <td>
              <center>{{item.name}}</center>
            </td>
            <td>
              <center>{{item.cpf}}</center>
            </td>
            <td>
              <center>{{item.birth}}</center>
            </td>
            <td>
              <center>
                <b-button
                  v-b-modal.modal-options
                  @click="Select(index)"
                  variant="primary"
                  class="mx-2"
                >Opções</b-button>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      select: [],
      name: "",
      birth: "",
      addname: "",
      addcpf: null,
      addbirth: "",
      //modals
      error: "",
      msg: false,
      show: false
    };
  },
  created() {
    this.List();
  },
  methods: {
    List() {
      this.axios
        .get("/")
        .then(response => {
          this.users = response.data;
        })
        .catch(e => {
          console.log("error" + e);
        });
    },
    Edit() {
      if (!this.name == undefined || this.name == "" || this.name == null) {
        this.msg = true;
        this.error = "Nome inválido";
      } else if (
        !this.birth == undefined ||
        this.birth == "" ||
        this.birth == null
      ) {
        this.msg = true;
        this.error = "Data inválida";
      } else {
        const upt = [{ name: this.name, birth: this.birth }];
        this.axios
          .put("/update/" + this.select.id, upt)
          .then(response => {
            window.location.href = "/";
          })
          .catch(e => {
            this.msg = true
            this.error = 'Erro! Verifique os dados do cliente'
          });
        
      }
    },
    Add() {
      if (
        !this.addname == undefined ||
        this.addname == "" ||
        this.addname == null
      ) {
        this.msg = true;
        this.error = "Nome inválido";
      } else if (
        !this.addcpf == undefined ||
        this.addcpf == "" ||
        this.addcpf == null
      ) {
        this.msg = true;
        this.msg = true;
        this.error = "CPF inválido";
      } else if (
        !this.addbirth == undefined ||
        this.addbirth == "" ||
        this.addbirth == null
      ) {
        this.msg = true;
        this.error = "Data inválida";
      } else {
        const upt = [
          { name: this.addname, cpf: this.addcpf, birth: this.addbirth }
        ];
        this.axios
          .post("/add-user", upt)
          .then(response => {
            window.location.href = "/";
          })
          .catch(e => {
            this.msg = true
            this.error = 'Erro! Verifique os dados do cliente'
          });
        
      }
    },
    Delete() {
      this.axios
        .delete("/user-delete/" + this.select.id)
        .then(response => {})
        .catch(e => {
          console.log("error" + e);
        });
      window.location.href = "/";
    },
    Contacts() {
      window.location.href = "/contacts/" + this.select.id;
    },
    Addresses() {
      window.location.href = "/addresses/" + this.select.id;
    },
    Select(id) {
      this.select = this.users[id];
      this.name = this.users[id].name;
      this.birth = this.users[id].birth;
    }
  }
};
</script>