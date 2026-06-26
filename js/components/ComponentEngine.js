export class ComponentEngine {
  constructor(components = {}) {
    this.components = components;
    this.instances = [];
  }

  init() {
    const elements = document.querySelectorAll('[data-component]');
    elements.forEach(el => {
      const componentName = el.getAttribute('data-component');
      const ComponentClass = this.components[componentName];
      if (ComponentClass) {
        try {
          const instance = new ComponentClass(el);
          this.instances.push(instance);
        } catch (e) {
          console.error(`Error initializing component ${componentName}:`, e);
        }
      }
    });
  }
}
