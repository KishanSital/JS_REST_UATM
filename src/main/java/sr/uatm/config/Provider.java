package sr.uatm.config;

import org.hibernate.tool.schema.spi.SchemaFilter;
import org.hibernate.tool.schema.spi.SchemaFilterProvider;

public class Provider implements SchemaFilterProvider {
    @Override
    public SchemaFilter getCreateFilter() {
        return MySchemaFilter.INSTANCE;
    }

    @Override
    public SchemaFilter getDropFilter() {
        return MySchemaFilter.INSTANCE;
    }

    @Override
    public SchemaFilter getMigrateFilter() {
        return MySchemaFilter.INSTANCE;
    }

    @Override
    public SchemaFilter getValidateFilter() {
        return MySchemaFilter.INSTANCE;
    }
}
