<!-- 排课冲突 -->
<template>
  <div class="app-container">
    <div class="containerBox" style="position: relative">
      <div
        id="container"
        style="width: calc(100vw - 750px); height: calc(100vh - 150px)"
      ></div>
      <div id="js-properties-panel" class="panel"></div>
    </div>
  </div>
</template>

<script setup>
import translate from "@/assets/bpmn/translate.js";
import { onMounted, markRaw } from "vue";
// bpmn-js相关
import "bpmn-js/dist/assets/diagram-js.css"; // 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import BpmnModeler from "bpmn-js/lib/Modeler";
// bpmn-js-properties-panel相关
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

onMounted(async () => {
  /*
 
  
  const bpmnModeler = markRaw(
    new BpmnModeler({
      container: containerEl,
      // 添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel",
      },
      // 右侧属性面板
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        customTranslateModule,
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    })
  );
  bpmnModeler.createDiagram(() => {    
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_1" isExecutable="false">
        <bpmn:startEvent id="StartEvent_1"/>
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="_StartEvent_1_di" bpmnElement="StartEvent_1">
            <dc:Bounds x="150" y="50" width="30" height="30"/>
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>
  `;
    // bpmnModeler.get("canvas").zoom("fit-viewport");
  });
  */
  const customTranslateModule = {
    translate: ["value", translate],
  };
  const containerEl = document.getElementById("container");
  const bpmnModeler = markRaw(
    new BpmnModeler({
      container: containerEl,
      // 添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel",
      },
      // 右侧属性面板
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        customTranslateModule,
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    })
  );
  try {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_1" isExecutable="false">
        <bpmn:startEvent id="StartEvent_1"/>
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="_StartEvent_1_di" bpmnElement="StartEvent_1">
            <dc:Bounds x="150" y="50" width="30" height="30"/>
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>
  `;
    const result = await bpmnModeler.importXML(xml);
    const { warnings } = result;
    console.log(warnings);
  } catch (err) {
    console.log(err.message, err.warnings);
  }
});
</script>
<style lang="scss" scoped>
.containerBox {
  height: calc(100vh - 160px);
  margin-top: 30px;
}

.containerBox #container {
  height: calc(100vh - 160px);
  border: 1px solid rgb(121, 121, 121);
}

.bpp-properties-panel [type="text"] {
  box-sizing: border-box;
}

.panel {
  width: 400px;
  position: absolute;
  top: 1px;
  right: 1px;
  height: 100%;
  overflow: auto;
}

/* 右下角logo */
.bjs-powered-by {
  display: none;
}
</style>
