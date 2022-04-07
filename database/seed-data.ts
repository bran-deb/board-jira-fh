


interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}
interface SeedData {
    entries: SeedEntry[]
}

//insert data on mongodb
export const seetData: SeedData = {
    entries: [
        {
            description: 'pending: Ut ut Lorem adipisicing irure esse amet sunt aliqua dolore deserunt sint cupidatat eu.',
            status: 'pending',
            createAt: Date.now()
        },
        {
            description: 'in-progress: Minim nulla irure occaecat occaecat laborum ex.',
            status: 'in-progress',
            createAt: Date.now() - 1_000_000
        },
        {
            description: 'finished: Excepteur eu eiusmod enim veniam mollit culpa quis incididunt elit non occaecat officia.',
            status: 'finished',
            createAt: Date.now() - 100_000
        },
    ]
}