<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="my-5 container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="terms-list">
                        <ul>
                            <li>All credit/debit cards’ details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties.</li>
                            <li>Shea Global Trading will not pass any debit/credit card details to third parties.</li>
                            <li>Shea Global Trading takes appropriate steps to ensure data privacy and security including through various hardware and software methodologies. However, www.sheaglobaltrading.com cannot guarantee the security of any information that is disclosed online.</li>
                            <li>Shea Global General Trading LLC is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties different rules regarding the collection and use of your personal information may apply. You should contact these entities directly if you have any questions about their use of the information that they collect.</li>
                            <li>The Website Policies and Terms & Conditions may be changed or updated occasionally to meet the requirements and standards. Therefore, the Customers’ are encouraged to frequently visit these sections to be updated about the changes on the website. Modifications will be effective on the day they are posted</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopHeroBanner from '@/components/TopHeroBanner.vue';
    export default {
        components: {heroBanner: TopHeroBanner},
        name: 'Privacy',
        data() {
            return {
                title: 'Privacy Policy',
            }
        },
        metaInfo() {
            return {
                title: 'Privacy Policy'
            }
        }
    }
</script>
