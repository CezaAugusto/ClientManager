<template>
  <div class="container mt-5">
    <!-- Edit Tenant -->
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
        <input type="text" class="mb-2 pl-3 form-control" maxlength="50" v-model="selectname" />
        <hr />
        <label>
          CPF
          <small>(não editável)</small>
        </label>
        <br />
        <label type="text" class="mb-2 pl-3 form-control" name="username">{{selectcpf}}</label>
        <hr />
        <label>Data de nascimento *</label>
        <br />
        <input type="date" class="mb-2 pl-3 form-control" v-model="selectbirth" />
        <hr />
        <b-btn variant class="float-right ml-3" @click="show=false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Edit(), show = false">Salvar</b-btn>
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
          Tem certeza que quer excluir o Inquilino
          <strong>{{selectname}}</strong>?
        </label>
        <br />
        <hr />
        <b-btn variant="danger" class="float-right" @click="show = false">Cancelar</b-btn>
        <b-btn variant="success" class="float-right mr-3" @click="Delete(), show = false">Confirmar</b-btn>
      </b-modal>
    </div>
    <!-- Add Tenant -->
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
          v-model="selectname"
        />
        <hr />
        <label>
          CPF *
          <small><strong>(somente números)</strong></small>
        </label>
        <input class="mb-3 pl-3 form-control" maxlength="11" placeholder="CPF" v-model="selectcpf" />
        <hr />
        <label>Data de nascimento *</label>
        <br />
        <input type="date" class="mb-2 pl-3 form-control" name="date" v-model="selectbirth" />
        <hr />
        <b-btn variant class="float-right ml-3" @click="show = false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Add()">Salvar</b-btn>
      </b-modal>
    </div>

    <!-- ------------------------------------------------------------------------------------------ -->
    <div class="card border-mutted">
      <div class="card-header bg-secondary text-white">
        <label>
          <h5 class="ml-1 mt-1 row mb-0">
            <a href="/" class="text-white mr-1">
              <u>Clientes</u>
            </a>|
            <a href="#" @click="Return()" class="text-white ml-1 mr-1">
              <u>Endereços</u>
            </a>
            | Inquilinos | {{addresses[0].street}}
          </h5>
        </label>
        <b-btn
          variant="success"
          v-b-modal.modal-add
          class="text-white float-right"
          @click="show = true, Clear()"
        >Adicionar Inquilino</b-btn>
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
          <tr v-for="(item, index) in tenants" :key="index">
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
                  v-b-modal.modal-edit
                  @click="Select(index), show = true"
                  class="btn-info mx-2"
                >Editar</b-button>
                <b-button
                  v-b-modal.modal-confirm
                  @click="Select(index), show = true"
                  class="btn-danger mx-2"
                >Excluir</b-button>
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
      //user
      user: [],
      //address
      addresses: [],
      //tenants
      tenants: [],
      selectid: null,
      selectname: "",
      selectcpf: null,
      selectbirth: "",
      //extras
      show: false,
      error: "",
      msg: false
    };
  },
  mounted() {
    this.User();
    this.Address();
    this.Tenants();
  },
  methods: {
    User() {
      this.axios
        .get("/get-user/" + this.$route.params.user)
        .then(response => {
          this.user = response.data;
        })
        .catch(e => {
          console.log("error" + e);
        });
    },
    Address() {
      this.axios
        .get("/get-address/" + this.$route.params.address)
        .then(response => {
          this.addresses = response.data;
        })
        .catch(e => {
          console.log("error" + e);
        });
    },
    Tenants() {
      this.axios
        .get("/tenants/" + this.$route.params.address)
        .then(response => {
          this.tenants = response.data;
        })
        .catch(e => {
          console.log("error" + e);
        });
    },
    Select(id) {
      this.selectid = this.tenants[id].id;
      this.selectbirth = this.tenants[id].birth;
      this.selectname = this.tenants[id].name;
      this.selectcpf = this.tenants[id].cpf;
    },
    Edit() {
      if (
        this.selectname == "" ||
        this.selectname == undefined ||
        this.selectname == null
      ) {
        this.msg = true;
        this.error = "Nome inválido";
      } else if (
        this.selectbirth == "" ||
        this.selectbirth == undefined ||
        this.selectbirth == null
      ) {
        this.msg = true;
        this.error = "Data inválida";
      } else {
        const upt = [{ name: this.selectname, birth: this.selectbirth }];
        this.axios
          .put("/update-tenants/" + this.selectid, upt)
          .then(response => {
            window.location.href =
          "/tenants/" + this.user[0].id + "/" + this.addresses[0].id;
          })
          .catch(e => {
            this.msg = true
            this.error = 'Erro! Verifique os dados do inquilino!'
          });
        
      }
    },
    Delete() {
      this.axios
        .delete("/delete-tenants/" + this.selectid)
        .then(response => {})
        .catch(e => {
          console.log("error" + e);
        });
      window.location.href =
        "/tenants/" + this.user[0].id + "/" + this.addresses[0].id;
    },
    Clear() {
      this.selectid = null;
      this.selectbirth = "";
      this.selectname = "";
      this.selectcpf = null;
    },
    Add() {
      if (
        this.selectname == "" ||
        this.selectname == undefined ||
        this.selectname == null
      ) {
        this.msg = true;
        this.error = "Nome inválido";
      } else if (
        this.selectcpf == "" ||
        this.selectcpf == undefined ||
        this.selectcpf == null
      ) {
        this.msg = true;
        this.error = "CPF inválido";
      } else if (
        this.selectbirth == "" ||
        this.selectbirth == undefined ||
        this.selectbirth == null
      ) {
        this.msg = true;
        this.error = "Data inválida";
      } else {
        const upt = [
          {
            idUser: this.user[0].id,
            idAddress: this.addresses[0].id,
            name: this.selectname,
            cpf: this.selectcpf,
            birth: this.selectbirth
          }
        ];
        this.axios
          .post("/add-tenants", upt)
          .then(response => {
             window.location.href =
          "/tenants/" + this.user[0].id + "/" + this.addresses[0].id;
          })
          .catch(e => {
            this.msg = true
            this.error = 'Erro! Verifique os dados do inquilino!'
          });
       
      }
    },
    Return() {
      window.location.href = "/addresses/" + this.user[0].id;
    }
  }
};
</script>