<template>
    <div class="row">
        <div class="col-md-8 offset-md-2 my-4">
            <div class="formLoginMsg">
                {{ loginMsg }}
            </div>
            <form>
                <div class="form-group">
                    <input type="email" name="email" id="email" class="form-control"
                        placeholder="E-Mail*"
                        v-model="loginEmail"
                    >
                </div>
                <div class="form-group">
                    <input type="password" name="password" id="password" class="form-control"
                        placeholder="Password*"
                        v-model="loginPassword"
                    >
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        props: [
            'loginEmail', 'loginPassword', 'loginMsg'
        ]
    }
</script>
