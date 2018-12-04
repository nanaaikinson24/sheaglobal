<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="detailsFormMsg"></div>

                <form>
                    <div class="form-group">
                        <label for="email" class="">Email</label>
                        <input type="email" class="form-control" id="email" readonly 
                            v-model="email"
                        >
                    </div>

                    <div class="form-group">
                        <label for="fname" class="">First Name</label>
                        <input type="text" name="fname" class="form-control" id="fname" 
                            v-model="firstname" v-validate="'required'" data-vv-as="first name"
                        >
                        <span class="text-danger">{{ errors.first('fname') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="lname" class="">Last Name</label>
                        <input type="text" name="lname" class="form-control" id="lname" 
                            v-model="lastname" v-validate="'required'"  data-vv-as="last name"
                        >
                        <span class="text-danger">{{ errors.first('lname') }}</span>
                    </div>

                    <div class="form-group">
                        <div class="text-center">
                            <button class="btn btn-success" @click.prevent="updateDetails($event)">
                                Update Details
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Details",
  props: ["email", "firstname", "lastname", "mask"],
  methods: {
    //Update Details
    updateDetails(e) {
      $(".s-v-e").remove();
      let btn = e.currentTarget;

      this.$validator.validateAll().then(result => {
        if (result) {
          btn.setAttribute("disabled", "");
          btn.classList.add("is-loading", "is-loading-sm");

          let params = new URLSearchParams();
          params.append("fname", this.firstname);
          params.append("lname", this.lastname);
          params.append("mask", this.mask);

          axios
            .post(APIURL + `users/update/details`, params)
            .then(response => {
              btn.removeAttribute("disabled", "");
              btn.classList.remove("is-loading", "is-loading-sm");

              let res = response.data;

              if (res.status == 200) {
                this.$swal("Success", res.msg, "success");
              } else {
                if (res.status == 400) {
                  $.each(res.errors, (k, v) => {
                    $("#" + k).after(v);
                  });
                } else {
                  $(".detailsFormMsg").html(
                    `<p class="text-danger" id="detailsFormMsg">${res.msg}</p>`
                  );
                  setTimeout(() => {
                    $("#detailsFormMsg").fadeOut();
                  }, 2500);
                }
              }
            })
            .catch(err => {});
        }
      });
    }
  }
};
</script>
