package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDrugMyPill is a Querydsl query type for DrugMyPill
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDrugMyPill extends EntityPathBase<DrugMyPill> {

    private static final long serialVersionUID = 1546758253L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDrugMyPill drugMyPill = new QDrugMyPill("drugMyPill");

    public final QDrug drug;

    public final QDrugMy drug_my;

    public final NumberPath<Long> drug_my_pill_id = createNumber("drug_my_pill_id", Long.class);

    public QDrugMyPill(String variable) {
        this(DrugMyPill.class, forVariable(variable), INITS);
    }

    public QDrugMyPill(Path<? extends DrugMyPill> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDrugMyPill(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDrugMyPill(PathMetadata metadata, PathInits inits) {
        this(DrugMyPill.class, metadata, inits);
    }

    public QDrugMyPill(Class<? extends DrugMyPill> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.drug = inits.isInitialized("drug") ? new QDrug(forProperty("drug"), inits.get("drug")) : null;
        this.drug_my = inits.isInitialized("drug_my") ? new QDrugMy(forProperty("drug_my"), inits.get("drug_my")) : null;
    }

}

