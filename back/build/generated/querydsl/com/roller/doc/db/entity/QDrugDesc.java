package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDrugDesc is a Querydsl query type for DrugDesc
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDrugDesc extends EntityPathBase<DrugDesc> {

    private static final long serialVersionUID = 935400441L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDrugDesc drugDesc = new QDrugDesc("drugDesc");

    public final QDrug drug;

    public final StringPath drug_desc_cat = createString("drug_desc_cat");

    public final StringPath drug_desc_com = createString("drug_desc_com");

    public final StringPath drug_desc_effect = createString("drug_desc_effect");

    public final StringPath drug_desc_safety = createString("drug_desc_safety");

    public final StringPath drug_desc_shape = createString("drug_desc_shape");

    public final StringPath drug_desc_use = createString("drug_desc_use");

    public final NumberPath<Long> drug_id = createNumber("drug_id", Long.class);

    public QDrugDesc(String variable) {
        this(DrugDesc.class, forVariable(variable), INITS);
    }

    public QDrugDesc(Path<? extends DrugDesc> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDrugDesc(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDrugDesc(PathMetadata metadata, PathInits inits) {
        this(DrugDesc.class, metadata, inits);
    }

    public QDrugDesc(Class<? extends DrugDesc> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.drug = inits.isInitialized("drug") ? new QDrug(forProperty("drug"), inits.get("drug")) : null;
    }

}

