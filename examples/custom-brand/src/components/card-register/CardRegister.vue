<script setup lang="ts">
import Card from 'design-system/src/components/ui/card/Card.vue'
import CardTitle from 'design-system/src/components/ui/card/CardTitle.vue'
import TextStyle from 'design-system/src/components/ui/text-style/TextStyle.vue'
import FormTextfield from 'design-system/src/components/ui/form-textfield/FormTextfield.vue'
import FormLayoutItem from 'design-system/src/components/ui/form-layout/FormLayoutItem.vue'
import Button from 'design-system/src/components/ui/button/Button.vue'
</script>

<template>

  <Card class="card-register">
    <CardTitle class="title">Dados de contato</CardTitle>
    <TextStyle class="legend" label="Informe os dados para cobrança, acesso e liberação do painel da loja" tag="p" />
    <form class="form">
      <FormLayoutItem>
        <FormTextfield invalid-feedback="" label="E-mail" placeholder="Seu e-mail principal" />
      </FormLayoutItem>
      <FormLayoutItem>
        <FormTextfield invalid-feedback="" label="Telefone" placeholder="Seu contato principal" />
      </FormLayoutItem>
      <FormLayoutItem>
        <TextStyle class="terms" variant="muted" tag="small">Clicando no botão, você concorda com nossos termos de política e privacidade. Não se preocupe seus dados estão seguros, conforme a Lei Geral de Proteção de Dados.</TextStyle>
      </FormLayoutItem>
      <FormLayoutItem>
        <Button size="lg" class="btn-step" block label="Proseguir" variant="success" />
      </FormLayoutItem>
    </form>
  </Card>

</template>

<style lang="scss" scoped>
.card-register {
  width: 90vw;
  max-width: 540px;

  .title {
    display: block;
    text-align: center;
    font: var(--s-typography-heading-x-large)
  }

  .legend {
    display: block;
    text-align: center;
  }

  .form{
    margin-top: var(--s-spacing-medium);
  }

  .btn-step{
    max-width: 200px;
    margin: var(--s-spacing-x-small) auto 0;
  }

  .terms {
    text-align: center;
    line-height: 1.2em;
  }
}
</style>
