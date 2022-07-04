import { shallowRef, nextTick } from 'vue';
import ActionRadio from '@/views/editor/components/ActionRadio.vue';
import FilterSelect from '@/views/editor/components/FilterSelect.vue';

export const addItem = (
  form,
  actionsList,
  actionsChecked,
  selectedOptions,
  t
) => {
  const id = Math.random() * 100000000 + '';
  const type = selectedOptions[0].value;
  const obj = {
    id,
    type,
    tipsDes: t(`editorPage.subConfig.nodeActions['${type}'].tipsDes`),
    component: null,
  };

  actionsChecked.push([id, true]);

  switch (type) {
    case 'Flag Operator':
    case 'Sort Operator':
    case 'Resolve Domain Operator':
      obj.component = shallowRef(ActionRadio);
      form.process.push({ id, type, args: null });
      break;
    case 'Region Filter':
    case 'Type Filter':
      obj.component = shallowRef(FilterSelect);
      form.process.push({ id, type, args: [] });
      break;
  }
  actionsList.push(obj);

  console.log(form.process);
  console.log(actionsList);
  console.log(actionsChecked);
  // 添加后将页面置底
  nextTick(() => {
    const container = document.querySelector('.app-layout-wrapper');
    container.scrollTo({
      top: container.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  });
};

export const deleteItem = (form, actionsList, actionsChecked, id) => {
  const processIndex = form.process.findIndex(item => item.id === id);
  const actionsIndex = actionsList.findIndex(item => item.id === id);
  const checkedIndex = actionsChecked.findIndex(item => item[0] === id);
  form.process.splice(processIndex, 1);
  actionsList.splice(actionsIndex, 1);
  actionsChecked.splice(checkedIndex, 1);
};
