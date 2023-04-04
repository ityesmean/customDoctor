package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1149484685L;

    public static final QUser user = new QUser("user");

    public final ListPath<DrugMy, QDrugMy> drugMIES = this.<DrugMy, QDrugMy>createList("drugMIES", DrugMy.class, QDrugMy.class, PathInits.DIRECT2);

    public final BooleanPath userDeleted = createBoolean("userDeleted");

    public final StringPath userEmail = createString("userEmail");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath userName = createString("userName");

    public final EnumPath<Role> userRole = createEnum("userRole", Role.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

