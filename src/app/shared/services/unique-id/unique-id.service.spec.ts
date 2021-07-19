import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {

    let service: UniqueIdService = null;
    beforeEach(() => {
        //Tudo aqui dentro é executado antes de cada it
       service = new UniqueIdService();
    });

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
        const id = service.generateUniqueIdWithPrefix('app');
        //É esperado que o id contenha app-
        // expect(id).toContain('app-');
        expect(id.startsWith('app-')).toBeTrue();

        expect(true).toBeTrue(); //Só compara o valor com true
        expect(true).toBe(true); //Só compara os valores boolean, não uma instancia boolean.
        expect(true).toBeTruthy(); //Só da erro se for um valor vazio.
    });

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not generate duplicate IDs when called multiple times`, () => {
        const ids = new Set();
        for (let i=0; i < 50; i++) {
            ids.add(service.generateUniqueIdWithPrefix('app'));
        }
        expect(ids.size).toBe(50);
    });

    it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} should return the number of generatedIds when called`, () => {
        service.generateUniqueIdWithPrefix('app');
        service.generateUniqueIdWithPrefix('app');
        expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
    });

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should throw when called with empty`, () => {
        expect(() => service.generateUniqueIdWithPrefix(null)).toThrow();
        expect(() => service.generateUniqueIdWithPrefix(undefined)).toThrow();
        expect(() => service.generateUniqueIdWithPrefix('')).toThrow();
    });

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should throw when called with empty V2`, () => {
        const emptyValues = [null, undefined, ''];
        emptyValues.forEach(emptyValue => {
            //withContext mostra a mensagem quando a expectativa não for atendida
            expect(() => service.generateUniqueIdWithPrefix(emptyValue))
            .withContext(`Empty value: ${emptyValues}`)
            .toThrow();
        });
    }); 

});

//blabla should blabla when blabla