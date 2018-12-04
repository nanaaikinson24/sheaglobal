<template>
    <div class="app-contact">
        <hero-banner :title="bannerTitle"></hero-banner>

        <div class="container my-5">
            <div class="row">
                <div class="col-md-6">
                    <p>Feel free to reach to us. Our doors are always open.</p>
                    <div class="">
                        <div class="">
                            <div class="callbackFromMsg"></div>

                            <form id="callbackForm">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" id="name" class="form-control"
                                        v-model="contactData.name" v-validate="'required'"
                                    >
                                    <span class="text-danger">{{ errors.first('name') }}</span>
                                </div>

                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" id="email" class="form-control"
                                        v-model="contactData.email" v-validate="'required|email'"
                                    >
                                    <span class="text-danger">{{ errors.first('email') }}</span>
                                </div>

                                <div class="form-group">
                                    <label>Message</label>
                                    <textarea name="message" id="message" cols="30" rows="4" class="form-control"
                                        v-model="contactData.message" v-validate="'required'"
                                    ></textarea>
                                    <span class="text-danger">{{ errors.first('message') }}</span>
                                </div>

                                <div class="form-group">
                                    <button class="btn btn-block btn-success" v-on:click.prevent="contactFormSubmitFxn($event)">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 offset-md-1 my-4">
                    <div class="contact-icons">

                        <div class="row  d-flex flex-md-column">
                            <div class="col-sm-6 col-md-12">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src="../assets/img/placeholder.svg" class="" height="60px">
                                    </div>

                                    <div class="col-md-9">
                                        <h4>Location:</h4>
                                        <p><b>Shea Global Trading</b><br/>
                                            19th Floor, Conrad Hotel Offices<br/>
                                            Sheikh Zayed Road<br/>
                                            Dubai, United Arab Emirates</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-6 mt-md-5 mt-sm-4 mt-3">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src="../assets/img//email.svg" class="" height="60px">
                                    </div>

                                    <div class="col-md-9">
                                        <h4>Email:</h4>
                                        <p>info@sheaglobaltrading.com</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-6 mt-md-5 mt-sm-4 mt-3">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src="../assets/img//phone-call.svg" class="" height="60px">
                                    </div>

                                    <div class="col-md-9">
                                        <h4>Phone:</h4>
                                        <p>+971528568815<br/>
                                        +971562703623</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<script>
import axios from "axios";
import TopHeroBanner from "../components/TopHeroBanner.vue";

export default {
  components: { heroBanner: TopHeroBanner },
  name: "Contact",
  data() {
    return {
      contactData: { name: "", message: "", email: "" },
      bannerTitle: "Contact Us"
    };
  },
  metaInfo: {
    title: "Contact Us"
  },
  methods: {
    contactFormSubmitFxn(e) {
      var btn = e.currentTarget;
      var sve = document.querySelector(".s-v-e");
      if (sve) sve.remove();

      this.$validator.validateAll().then(result => {
        if (result) {
          var contactFormData = {
            name: this.contactData.name,
            email: this.contactData.email,
            message: this.contactData.message
          };

          contactFormData = JSON.stringify(contactFormData);

          axios.interceptors.request.use(function(arg) {
            btn.innerHtml = '<i class="fa fa-spinner fa-spin fa-fw"></i>';
            return arg;
          });

          axios
            .post(APIURL + "contact", contactFormData)
            .then(response => {
              var res = response.data;
              btn.innerHTML = "Submit";
              if (res.status === true) {
                var responseMsg = document.querySelector(".callbackFromMsg");
                var html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                ${res.msg}
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>`;
                responseMsg.classList.add("my-3");
                responseMsg.innerHTML = html;

                this.contactData.name = "";
                this.contactData.email = "";
                this.contactData.message = "";

                this.$validator.reset();
              } else {
                if (res.status === "validation_errors") {
                  res.errors.forEach((k, v) => {
                    document.querySelector(`#${k}`).appendChild(v);
                  });
                } else {
                  var responseMsg = document.querySelector(".callbackFromMsg");
                  var html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                ${res.msg}
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>`;
                  responseMsg.classList.add("my-3");
                  responseMsg.innerHTML = html;

                  this.contactData.name = "";
                  this.contactData.email = "";
                  this.callbackData.message = "";

                  this.$validator.reset();
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
