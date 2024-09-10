
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory-repository";
import { Entity } from "../../../../shared/domain/entity";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";

// Definindo o tipo para as propriedades necessárias para construir uma StubEntity
type StubEntityConstructorProps = {
    entity_id?: Uuid
    name: string
    price: number
}

// Definindo a classe StubEntity que estende a classe Entity
class StubEntity extends Entity {
    entity_id: Uuid;
    name: string;
    price: number;

    // Construtor para criar uma instância de StubEntity com as propriedades fornecidas
    constructor(props: StubEntityConstructorProps) {
        super(); // Chamando o construtor da superclasse (Entity)
        this.entity_id = props.entity_id ?? new Uuid();
        this.name = props.name;
        this.price = props.price
    }

    toJSON() {
        return {
            entity_id: this.entity_id,
            name: this.name,
            price: this.price
        }
    }
}


class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
    getEntity(): new (...args: StubEntity[]) => StubEntity {
        return StubEntity
    }
}

describe('InMemoryRepository Unit Tests', () => {
    let repo: StubInMemoryRepository;

    beforeEach(() => {
        repo = new StubInMemoryRepository
    });

    test('should insert a new entity', async () => {
        const entity = new StubEntity({
            entity_id: new Uuid(),
            name: 'test',
            price: 100
        })
        await repo.insert(entity);
        expect(repo.items.length).toBe(1);
        expect(repo.items[0].name).toBe('test');
        expect(repo.items[0].price).toBe(100);
    });

    test('should bulk insert entities', async () => {
        const entities = [

            new StubEntity({
                entity_id: new Uuid(),
                name: 'test',
                price: 100
            }),
            new StubEntity({
                entity_id: new Uuid(),
                name: 'test2',
                price: 200
            })

        ];

        await repo.bulkInsert(entities);
        expect(repo.items.length).toBe(2);
        expect(repo.items[0].name).toBe('test');
        expect(repo.items[1].name).toBe('test2');
        expect(repo.items[0].price).toBe(100);
        expect(repo.items[1].price).toBe(200);
    });

    test('should returns all entities', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repo.insert(entity);

        const entities = await repo.findAll();

        expect(entities).toStrictEqual([entity]);
    });

    test('should throws error on update when entity not found', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        expect(repo.update(entity)).rejects.toThrowError(
            new NotFoundError(entity.entity_id, StubEntity)
        )
    });

    test('should update an entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repo.insert(entity);

        const entityUpdated = new StubEntity({
            entity_id: entity.entity_id,
            name: 'new name',
            price: 10
        });
        await repo.update(entityUpdated);
        expect(entityUpdated.toJSON()).toStrictEqual(repo.items[0].toJSON());
    });

    it('should throws error on delete when entity not found', async () => {
        const uuid = new Uuid();
        await expect(repo.delete(uuid)).rejects.toThrow(
          new NotFoundError(uuid.id, StubEntity),
        );

        await expect(
          repo.delete(new Uuid('9366b7dc-2d71-4799-b91c-c64adb205104')),
        ).rejects.toThrow(
          new NotFoundError('9366b7dc-2d71-4799-b91c-c64adb205104', StubEntity),
        );
      });

    test('should delete an entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repo.insert(entity);

        await repo.delete(entity.entity_id);
        expect(repo.items).toHaveLength(0);
    })
})