<script setup lang="ts">
import { autoLoadLocale } from "@/ts/global/vue/autoLoadLocale";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_ToolList";

autoLoadLocale(lp, () => {
  useTitle(`${t(`${lp}.title`)}${t('global.title')}`);
});
</script>

<template>
  <div class="container pt-2">
    <div class="row">
      <router-link :to="{name: 'tool_baseConversion'}"
                   class="col-3 router-link_toollist"
      >
        <div class="card toollist">
          <div class="card-header">
            {{t(`${lp}.baseConv.title`)}}
          </div>
          <div class="card-body">
            {{t(`${lp}.baseConv.description`)}}
          </div>
        </div>
      </router-link>
      <router-link :to="{name: 'tool_stringAndBaseConversion'}"
                   class="col-3 router-link_toollist"
      >
        <div class="card toollist">
          <div class="card-header">
            {{t(`${lp}.stringAndBaseConv.title`)}}
          </div>
          <div class="card-body">
            {{t(`${lp}.stringAndBaseConv.description`)}}
          </div>
        </div>
      </router-link>
      <router-link :to="{name: 'tool_qrcode'}"
                   class="col-3 router-link_toollist"
      >
        <div class="card toollist">
          <div class="card-header">
            {{t(`${lp}.qrcode.title`)}}
          </div>
          <div class="card-body">
            {{t(`${lp}.qrcode.description`)}}
          </div>
        </div>
      </router-link>
      <router-link :to="{name: 'tool_markdown-pane'}"
                   class="col-3 router-link_toollist"
      >
        <div class="card toollist">
          <div class="card-header">
            {{t(`${lp}.markdown-pane.title`)}}
          </div>
          <div class="card-body">
            {{t(`${lp}.markdown-pane.description`)}}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card{
  &.toollist{
    height: 10rem;
    .card-body{
      overflow-y: scroll;
    }
  }
}
.router-link_toollist{
  text-decoration: none;
  /*
  *{
      text-decoration: none;
  }
  */
}
</style>