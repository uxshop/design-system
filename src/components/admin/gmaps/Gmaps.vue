<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import Link from '../../ui/link/Link.vue';

interface AddressInterface {
  id?: number | null;
  customer_id?: number | null;
  name?: string;
  receiver?: string;
  street?: string;
  zipcode?: string | number;
  number?: string | number;
  district?: string;
  state?: string;
  city?: string;
  detail?: string | null;
  readonly city_ibge_id?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

interface Props {
  address: AddressInterface;
  linkOnly?: boolean;
  style?: string;
  width?: string | number;
  height?: string | number;
  zoom?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 720,
  height: 360,
  zoom: 20,
});

const image = ref<string | null>(null);
let timer: ReturnType<typeof setTimeout>;

const gmAddress = (val: AddressInterface) => {
  if (val) {
    const city = `${val.city} - ${val.state}`;
    const address = [val.street, val.number, city, val.zipcode];
    return address.join('+').replace(/\++$/, '');
  }
};

const getMapLinkPlace = () => {
  const address = gmAddress(props.address);
  return `https://www.google.com.br/maps/place/${address}`;
};

watchEffect(() => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const address = gmAddress(props.address);
    const style = '';
    image.value = `https://maps.googleapis.com/maps/api/staticmap?zoom=${props.zoom}&size=${props.width}x${props.height}&maptype=roadmap&format=png&visual_refresh=true&markers=color:0x00b7ff%7C40${address}&key=AIzaSyARh-u6T7Ux8wueTasFON8k0GiZRbMejDo${style}`;
  }, 1000);
});
</script>

<template>
  <div class="ui-gmaps">
    <Link v-if="linkOnly" :href="getMapLinkPlace" target="_blank"> ver no mapa </Link>

    <a :href="getMapLinkPlace()" target="_blank" class="ui-gmaps-link" v-if="!linkOnly && image">
      <img class="" :src="image" alt="Google Maps" />
      <div class="overlay">
        <small>Ver no</small>
        <b>Google Maps</b>
      </div>
    </a>
  </div>
</template>

<style lang="scss">
@import './Gmaps.scss';
</style>
