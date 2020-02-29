<template>
  <div class="container mt-5">
    <!-- Options buttons adress-->
    <div>
      <b-modal
        id="modal-address-options"
        no-stacking
        header-bg-variant="dark"
        header-close
        header-text-variant="light"
        size="sm"
        centered
        hide-footer
        title="Opções"
      >
        <b-btn variant="success" v-b-modal.modal-address-info>Visualizar</b-btn>
        <b-btn
          variant="warning"
          v-b-modal.modal-edit-address
          class="ml-2"
          @click="show = true"
        >Editar</b-btn>
        <b-btn variant="danger" v-b-modal.modal-confirm-address class="ml-2">Deletar</b-btn>
        <hr class="mx-2" />
        <div class="d-flex justify-content-center">
          <b-btn variant="info" class="mr-2" @click="Contacts()">Contatos</b-btn>
          <b-btn variant="info" class="ml-2" @click="Tenants()">Inquilinos</b-btn>
        </div>
      </b-modal>
    </div>

    <!-- Address info -->
    <div>
      <b-modal
        header-close
        id="modal-address-info"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        centered
        title="Informações do Endereço"
      >
        <label>Localização</label>
        <hr />
        <label>
          <strong class="ml-3">{{selectedAddress}}</strong>
        </label>
        <hr />
        <label>Cliente dono</label>
        <hr />
        <label>
          <strong class="ml-3">{{user[0].name}}</strong>
        </label>
        <hr />
        <b-btn
          variant="info"
          v-b-modal.modal-address
          class="mt-1 mr-3 float-right text-white"
        >Inquilinos</b-btn>
        <b-btn variant="info" v-b-modal.modal-address class="mt-1 mr-3 float-right">Contatos</b-btn>
      </b-modal>
    </div>
    <!-- Address Edit -->
    <div>
      <b-modal
        header-close
        v-if="show"
        id="modal-edit-address"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        centered
        title="Editar Endereço"
      >
        <b-alert show dismissible @dismissed="msg=false" variant="danger" v-if="msg">{{error}}</b-alert>
        <label>Rua *</label>
        <br />
        <input
          type="text"
          class="mb-3 pl-3 form-control"
          name="rua"
          placeholder="Avenida Itacoatiara"
          v-model="selectstreet"
        />
        <hr />
        <label>Numero *</label>
        <br />
        <input
          type="number"
          class="mb-3 pl-3 form-control"
          name="number"
          placeholder="361"
          v-model="selectnumber"
        />
        <hr />
        <label>Bairro *</label>
        <br />
        <input
          type="text"
          class="mb-3 pl-3 form-control"
          name="bairro"
          maxlength="20"
          placeholder="Cachoeirinha"
          v-model="selectneighborhood"
        />
        <hr />
        <label>Complemento *</label>
        <br />
        <input
          type="text"
          class="mb-3 pl-3 form-control"
          name="complemento"
          placeholder="Apt 04"
          v-model="selectcomplement"
        />
        <hr />
        <label>
          CEP *
          <small>
            <strong>(somente números)</strong>
          </small>
        </label>
        <br />
        <input
          class="mb-3 pl-3 form-control"
          name="contact"
          :maxlength="8"
          placeholder="69065-090"
          v-model="selectcep"
        />
        <hr />
        <b-btn variant class="float-right ml-3" @click="show = false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Edit()">Salvar</b-btn>
      </b-modal>
    </div>
    <!-- Address Add -->
    <div>
      <b-modal
        header-close
        v-if="show"
        id="modal-add-address"
        header-bg-variant="dark"
        header-text-variant="light"
        hide-footer
        centered
        title="Adicionar Contato"
      >
        <b-alert show dismissible @dismissed="msg=false" variant="danger" v-if="msg">{{error}}</b-alert>
        <label>Rua *</label>
        <br />
        <input
          type="text"
          class="mb-3 pl-3 form-control"
          placeholder="Avenida Itacoatiara"
          v-model="selectstreet"
        />
        <hr />
        <label>Número *</label>
        <br />
        <input
          type="number"
          class="mb-3 pl-3 form-control"
          placeholder="361"
          v-model="selectnumber"
        />
        <hr />
        <label>Bairro *</label>
        <br />
        <input
          type="text"
          class="mb-3 pl-3 form-control"
          maxlength="20"
          placeholder="Cachoeirinha"
          v-model="selectneighborhood"
        />
        <hr />
        <label>Complemento *</label>
        <br />
        <input
          type="text"
          class="mb-3 pl-3 form-control"
          placeholder="Apt 04"
          v-model="selectcomplement"
        />
        <hr />
        <label>
          CEP *
          <small>
            <strong>(somente números)</strong>
          </small>
        </label>
        <br />
        <input
          class="mb-3 pl-3 form-control"
          :maxlength="8"
          placeholder="69065-090"
          v-model="selectcep"
        />
        <hr />
        <b-btn variant class="float-right ml-3" @click="show = false">Fechar</b-btn>
        <b-btn variant="success" class="float-right" @click="Add()">Salvar</b-btn>
      </b-modal>
    </div>
    <!-- Address Delete -->
    <div>
      <b-modal
        header-close
        id="modal-confirm-address"
        title="Confirmar Ação?"
        size="md"
        hide-footer
        header-bg-variant="dark"
        header-text-variant="light"
      >
        <label>
          Tem certeza que quer excluir o endereço
          <strong>{{selectedAddress}}</strong>?
        </label>
        <br />
        <hr />
        <b-btn variant="danger" class="float-right" @click="showConfirm = false">Cancelar</b-btn>
        <b-btn variant="success" class="float-right mr-3" @click="Delete()">Confirmar</b-btn>
      </b-modal>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------- -->

    <div class="card border-mutted">
      <div class="card-header bg-secondary text-white">
        <label>
          <h5 class="ml-1 mt-1 row mb-0">
            <a href="/" class="text-white mr-1">
              <u>Clientes</u>
            </a>
            | Endereços | {{user[0].name}}
          </h5>
        </label>
        <b-btn
          variant="success"
          v-b-modal.modal-add-address
          @click="Clear(), show = true"
          class="text-white float-right"
        >Adicionar Endereço</b-btn>
      </div>
      <table class="table table-hover table-responsive-x1">
        <thead>
          <tr>
            <th scope="col">
              <center>#</center>
            </th>
            <th scope="col">
              <center>RUA</center>
            </th>
            <th scope="col">
              <center>NUMERO</center>
            </th>
            <th scope="col">
              <center>BAIRRO</center>
            </th>
            <th scope="col">
              <center>COMPLEMENTO</center>
            </th>
            <th scope="col">
              <center>CEP</center>
            </th>
            <th>
              <center>AÇÕES</center>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in addresses" :key="index">
            <td>
              <center>{{index}}</center>
            </td>
            <td>
              <center>{{item.street}}</center>
            </td>
            <td>
              <center>{{item.number}}</center>
            </td>
            <td>
              <center>{{item.neighborhood}}</center>
            </td>
            <td v-if="item.complement === ''">
              <small>
                <strong>
                  <center>(não informado)</center>
                </strong>
              </small>
            </td>
            <td v-else>
              <center>{{item.complement}}</center>
            </td>
            <td>
              <center>{{item.CEP}}</center>
            </td>
            <td>
              <center>
                <b-button
                  variant="primary"
                  class="mx-2"
                  v-b-modal.modal-address-options
                  @click="Select(index)"
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
      //user
      user: [],
      //address
      addresses: [],
      selectedid: "",
      selectcomplement: "",
      selectcep: "",
      selectneighborhood: "",
      selectnumber: "",
      selectstreet: "",
      selectedAddress: "",
      //extras
      show: false,
      error: "",
      msg: false
    };
  },
  mounted() {
    this.User();
    this.Address();
  },
  methods: {
    User() {
      this.axios
        .get("/get-user/" + this.$route.params.id)
        .then(response => {
          this.user = response.data;
        })
        .catch(e => {
          console.log("error" + e);
        });
    },
    Add() {
      if (
        this.selectstreet == "" ||
        this.selectstreet == undefined ||
        this.selectstreet == null
      ) {
        this.error = "Rua inválida";
        this.msg = true;
      } else if (
        this.selectnumber == "" ||
        this.selectnumber == undefined ||
        this.selectnumber == null
      ) {
        this.error = "Número inválido";
        this.msg = true;
      } else if (
        this.selectneighborhood == "" ||
        this.selectneighborhood == undefined ||
        this.selectneighborhood == null
      ) {
        this.error = "Bairro inválido";
        this.msg = true;
      } else if (
        this.selectcep == "" ||
        this.selectcep == undefined ||
        this.selectcep == null
      ) {
        this.error = "CEP inválido";
        this.msg = true;
      } else {
        const upt = [
          {
            idUser: this.user[0].id,
            street: this.selectstreet,
            number: this.selectnumber,
            neighborhood: this.selectneighborhood,
            complement: this.selectcomplement,
            CEP: this.selectcep
          }
        ];
        this.axios
          .post("/add-address/" + this.user[0].id, upt)
          .then(response => {
            window.location.href = "/addresses/" + this.user[0].id;
          })
          .catch(e => {
            this.msg = true
            this.error = 'Erro! Verifique os dados do endereço!'
          });
       
      }
    },
    Address() {
      this.axios
        .get("/address/" + this.$route.params.id)
        .then(response => {
          this.addresses = response.data;
          console.log(this.addresses);
        })
        .catch(e => {
          console.log("error" + e);
        });
    },
    Delete() {
      this.axios
        .delete("/delete-address/" + this.selectedid)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log("error" + e);
        });
      window.location.href = "/addresses/" + this.user[0].id;
    },
    Edit() {
      if (
        this.selectstreet == "" ||
        this.selectstreet == undefined ||
        this.selectstreet == null
      ) {
        this.error = "Rua inválida";
        this.msg = true;
      } else if (
        this.selectnumber == "" ||
        this.selectnumber == undefined ||
        this.selectnumber == null
      ) {
        this.error = "Número inválido";
        this.msg = true;
      } else if (
        this.selectneighborhood == "" ||
        this.selectneighborhood == undefined ||
        this.selectneighborhood == null
      ) {
        this.error = "Bairro inválido";
        this.msg = true;
      } else if (
        this.selectcep == "" ||
        this.selectcep == undefined ||
        this.selectcep == null
      ) {
        this.error = "CEP inválido";
        this.msg = true;
      } else {
        const upt = [
          {
            street: this.selectstreet,
            number: this.selectnumber,
            neighborhood: this.selectneighborhood,
            complement: this.selectcomplement,
            CEP: this.selectcep
          }
        ];
        this.axios
          .put("/edit-address/" + this.selectedid, upt)
          .then(response => {
            window.location.href = "/addresses/" + this.user[0].id;
          })
          .catch(e => {
           this.msg = true
            this.error = 'Erro! Verifique os dados do endereço!'
          });
        
      }
    },
    Select(id) {
      this.selectedAddress =
        this.addresses[id].street +
        " " +
        this.addresses[id].number +
        " " +
        this.addresses[id].neighborhood +
        " " +
        this.addresses[id].complement +
        " " +
        this.addresses[id].CEP;
      this.selectstreet = this.addresses[id].street;
      this.selectcep = this.addresses[id].CEP;
      this.selectnumber = this.addresses[id].number;
      this.selectneighborhood = this.addresses[id].neighborhood;
      this.selectcomplement = this.addresses[id].complement;
      this.selectedid = this.addresses[id].id;
    },
    Clear() {
      this.msg = false;
      this.error = "";
      this.selectedid = "";
      this.selectcomplement = "";
      this.selectcep = "";
      this.selectneighborhood = "";
      this.selectnumber = "";
      this.selectstreet = "";
      this.selectedAddress = "";
    },
    Tenants() {
      window.location.href =
        "/tenants/" + this.user[0].id + "/" + this.selectedid;
    },
    Contacts() {
      window.location.href =
        "/tenants-contacts/" + this.user[0].id + "/" + this.selectedid;
    }
  }
};
</script>