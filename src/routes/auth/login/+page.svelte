<script>
    import {loginHandler} from '/src/stores/auth.store.ts'
    import {goto} from "$app/navigation";
    async function handleSubmit(event){
        const data = new FormData(event.currentTarget);
        let object = {};
        data.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object);
        const res = await loginHandler(json)
        if(res.error ===""){
            goto('/dashboard/active');
        }
    };
</script>

<div class="flex flex-col gap-10 items-center flex-1 self-center w-[30rem]">
    <h1>Log in</h1>
    <form class="flex flex-col gap-6 md:w-[25rem]" on:submit|preventDefault={handleSubmit}>
        <div class="flex flex-col gap-4">
            <label for="email">E-mal address</label>
            <input name="email" required id="email" type="email" placeholder="Enter Your Email"/>
        </div>
        <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <input name="password" required id="password" type="password" placeholder="Enter Your Password"/>
        </div>
        <button type="submit" class="p-3 mt-5">Continue</button>

    </form>
    <p class="text-center">Forgot Password? <a class="text-[#2F96E1]" href="#">Click here</a></p>
</div>
<style lang="css">
    @import "login.css";
</style>
