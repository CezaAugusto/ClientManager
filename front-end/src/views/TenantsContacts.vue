<template>
  <div class="container mt-5">
    <!--Add Contact -->
    <div>
      <b-modal
        header-close
        v-if="show"
        id="modal-add-contact"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        centered
        title="Adicionar Contato"
      >
        <b-alert show dismissible @dismissed="msg=false" variant="danger" v-if="msg">{{error}}</b-alert>
        <label>Contato *</label>
        <br />
        <input
          :type="select === 'phone' ? 'number' : 'email'"
          class="mb-3 pl-3 form-control"
          name="contact"
          placeholder="Email ou Telefone"
          v-model="contact"
        />
        <hr />
        <label>Tipo *</label>
        <b-form-select v-model="select" :options="options"></b-form-select>

        <hr />
        <b-btn variant class="float-right ml-3" @click="show = false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Add()">Salvar</b-btn>
      </b-modal>
    </div>
    <!-- Confirm delete contact -->
    <div>
      <b-modal
        header-close
        v-if="show"
        id="modal-confirm-delete-contact"
        title="Confirmar Ação?"
        size="md"
        hide-footer
        header-bg-variant="dark"
        header-text-variant="light"
      >
        <label>
          Tem certeza que quer excluir o contato
          <strong>{{selectcontact}}</strong>?
        </label>
        <br />
        <hr />
        <b-btn variant="danger" class="float-right" @click="show = false">Cancelar</b-btn>
        <b-btn variant="success" class="float-right mr-3" @click="Delete()">Confirmar</b-btn>
      </b-modal>
    </div>

    <!-- Edit Contact -->
    <div>
      <b-modal
        header-close
        v-if="show"
        id="modal-edit-contact"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        centered
        title="Editar Contato"
      >
        <b-alert show dismissible @dismissed="msg=false" variant="danger" v-if="msg">{{error}}</b-alert>
        <label>Contato *</label>
        <br />
        <input
          :type="selectcontacttype === 'phone' ? 'number' : 'email'"
          class="mb-3 pl-3 form-control"
          name="contact"
          placeholder="Email ou Telefone"
          v-model="selectcontact"
        />
        <hr />
        <label>Tipo *</label>
        <b-form-select v-model="selectcontacttype" :options="options"></b-form-select>

        <hr />
        <b-btn variant class="float-right ml-3" @click="show = false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Edit()">Salvar</b-btn>
      </b-modal>
    </div>

    <!-- -------------------------------------------------------------------------------------------------------- -->
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
            | Contatos | {{addresses[0].street}}
          </h5>
        </label>
        <b-btn
          variant="success"
          v-b-modal.modal-add-contact
          class="text-white float-right"
          @click="show = true"
        >Adicionar Contato</b-btn>
      </div>
      <table class="table table-hover table-responsive-md">
        <thead>
          <tr>
            <th scope="col">
              <center>#</center>
            </th>
            <th scope="col">
              <center>CONTATO</center>
            </th>
            <th scope="col">
              <center>TIPO</center>
            </th>
            <th scope="col">
              <center>AÇÕES</center>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in contacts" :key="index">
            <th scope="row" v-if="item.type === 'email'">
              <center>
                <img alt="ClientManager logo" width="35" height="35" src="../assets/email.png" />
              </center>
            </th>
            <th scope="row" v-else>
              <center>
                <img alt="ClientManager logo" width="35" height="35" src="../assets/phone.png" />
              </center>
            </th>
            <td>
              <center>{{item.contact}}</center>
            </td>
            <td class="text-uppercase" v-if="item.type === 'phone'">
              <center>telefone</center>
            </td>
            <td class="text-uppercase" v-else>
              <center>email</center>
            </td>
            <td>
              <center>
                <b-button
                  class="btn-info mr-2"
                  v-b-modal.modal-edit-contact
                  @click="Select(index), show = true"
                >Editar</b-button>
                <b-button
                  class="btn-danger"
                  v-b-modal.modal-confirm-delete-contact
                  @click="Select(index), show = true"
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
      //contact
      contacts: [],
      contact: "",
      select: "phone",
      options: [
        { value: "phone", text: "Telefone" },
        { value: "email", text: "Email" }
      ],
      selectcontacttype: "",
      selectcontactid: "",
      selectcontact: "",
      //extras
      show: false,
      error: "",
      msg: false
    };
  },
  mounted() {
    this.User();
    this.Address();
    this.Contacts();
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
    Contacts() {
      this.axios
        .get("/get-contacts-address/" + this.$route.params.address)
        .then(response => {
          this.contacts = response.data;
        })
        .catch(e => {
          console.log("error" + e);
        });
    },
    Return() {
      window.location.href = "/addresses/" + this.user[0].id;
    },
    Add() {
      if (
        this.contact == "" ||
        this.contact == undefined ||
        this.contact == null
      ) {
        this.msg = true;
        this.error = "Contato inválido";
      } else if (
        this.select == "" ||
        this.select == undefined ||
        this.select == null
      ) {
        this.msg = true;
        this.error = "Tipo inválido";
      } else {
        const upt = [{idUser: this.user[0].id, contact: this.contact, type: this.select }];
        console.log(upt);
        this.axios
          .post("/add-contacts-address/" + this.addresses[0].id, upt)
          .then(response => {
            window.location.href =
          "/tenants-contacts/" + this.user[0].id + "/" + this.addresses[0].id;
          })
          .catch(e => {
            this.msg = true
            this.error = 'Erro! Verifique os dados do contato'
          });        
      }
    },
    Edit() {
      if (
        this.selectcontact == "" ||
        this.selectcontact == undefined ||
        this.selectcontact == null
      ) {
        this.msg = true;
        this.error = "Contato inválido";
      } else if (
        this.selectcontacttype == "" ||
        this.selectcontacttype == undefined ||
        this.selectcontacttype == null
      ) {
        this.msg = true;
        this.error = "Tipo inválido";
      } else {
        const upt = [
          { contact: this.selectcontact, type: this.selectcontacttype }
        ];
        this.axios
          .put("/update-contacts-address/" + this.selectcontactid, upt)
          .then(response => {
             window.location.href =
          "/tenants-contacts/" + this.user[0].id + "/" + this.addresses[0].id;
          })
          .catch(e => {
            this.msg = true
            this.error = 'Erro! Verifique os dados do contato'
          });
       
      }
    },
    Delete() {
      this.axios
        .delete("/delete-contacts-address/" + this.selectcontactid)
        .then(response => {})
        .catch(e => {
          console.log("error" + e);
        });
      window.location.href =
        "/tenants-contacts/" + this.user[0].id + "/" + this.addresses[0].id;
    },
    Select(id) {
      this.selectcontacttype = this.contacts[id].type;
      this.selectcontactid = this.contacts[id].id;
      this.selectcontact = this.contacts[id].contact;
    }
  }
};
</script>